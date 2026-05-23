import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChefHat, Plus, X, Trash2, CheckCircle, AlertTriangle,
    XCircle, Play, BookOpen, Package
} from 'lucide-react';

const getInventory = () => {
    const saved = localStorage.getItem('fastfood_inventory');
    return saved ? JSON.parse(saved) : [];
};

const setInventory = (items) => {
    localStorage.setItem('fastfood_inventory', JSON.stringify(items));
};

const getRecipes = () => {
    const saved = localStorage.getItem('fastfood_recipes');
    return saved ? JSON.parse(saved) : [];
};

const saveRecipes = (recipes) => {
    localStorage.setItem('fastfood_recipes', JSON.stringify(recipes));
};

const Recipes = () => {
    const [recipes, setRecipes] = useState(getRecipes);
    const [inventory, setInventoryState] = useState(getInventory);
    const [showModal, setShowModal] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Recipe form state
    const [dishName, setDishName] = useState('');
    const [ingredients, setIngredients] = useState([{ inventoryId: '', customName: '', qty: '', unit: '' }]);

    // Refresh inventory on mount and when modal opens
    useEffect(() => {
        setInventoryState(getInventory());
    }, [showModal, successMsg]);

    const openModal = () => {
        setDishName('');
        setIngredients([{ inventoryId: '', customName: '', qty: '', unit: '' }]);
        setShowModal(true);
    };

    const addIngredientRow = () => {
        setIngredients([...ingredients, { inventoryId: '', customName: '', qty: '', unit: '' }]);
    };

    const removeIngredientRow = (idx) => {
        setIngredients(ingredients.filter((_, i) => i !== idx));
    };

    const updateIngredient = (idx, field, value) => {
        const updated = ingredients.map((ing, i) => {
            if (i !== idx) return ing;
            if (field === 'inventoryId') {
                const invItem = inventory.find(inv => String(inv.id) === String(value));
                return { ...ing, inventoryId: value, unit: invItem ? invItem.unit : ing.unit, customName: '' };
            }
            return { ...ing, [field]: value };
        });
        setIngredients(updated);
    };

    const handleSaveRecipe = (e) => {
        e.preventDefault();
        if (!dishName.trim() || ingredients.length === 0) return;

        const newRecipe = {
            id: Date.now(),
            name: dishName.trim(),
            ingredients: ingredients.map(ing => {
                const invItem = inventory.find(inv => String(inv.id) === String(ing.inventoryId));
                return {
                    inventoryId: ing.inventoryId,
                    name: invItem ? invItem.item : ing.customName,
                    qty: Number(ing.qty),
                    unit: invItem ? invItem.unit : ing.unit,
                };
            }).filter(ing => ing.name && ing.qty > 0),
        };

        const updated = [newRecipe, ...recipes];
        setRecipes(updated);
        saveRecipes(updated);
        setShowModal(false);
    };

    const deleteRecipe = (id) => {
        const updated = recipes.filter(r => r.id !== id);
        setRecipes(updated);
        saveRecipes(updated);
    };

    // Check if all ingredients are available in inventory
    const checkAvailability = (recipe) => {
        const inv = getInventory();
        return recipe.ingredients.map(ing => {
            const invItem = inv.find(i => String(i.id) === String(ing.inventoryId));
            const available = invItem ? invItem.stock : 0;
            const enough = available >= ing.qty;
            return { ...ing, available, enough, invItem };
        });
    };

    const allEnough = (recipe) => checkAvailability(recipe).every(ing => ing.enough);

    // Deduct ingredients from inventory
    const handleCook = (recipe) => {
        const inv = getInventory();
        const checks = checkAvailability(recipe);
        const missing = checks.filter(c => !c.enough);

        if (missing.length > 0) {
            setErrorMsg(`Omborda yetarli emas: ${missing.map(m => `${m.name} (kerak: ${m.qty} ${m.unit}, mavjud: ${m.available} ${m.unit})`).join(', ')}`);
            setTimeout(() => setErrorMsg(''), 4000);
            return;
        }

        const updatedInv = inv.map(invItem => {
            const used = checks.find(c => String(c.inventoryId) === String(invItem.id));
            if (!used) return invItem;
            const newStock = invItem.stock - used.qty;
            const status = newStock <= 0 ? 'Critical' : newStock <= invItem.min ? 'Low Stock' : 'In Stock';
            return { ...invItem, stock: newStock, status };
        });

        setInventory(updatedInv);
        setInventoryState(updatedInv);
        setSuccessMsg(`✅ "${recipe.name}" muvaffaqiyatli tayyorlandi! Masalliqlar ombordan ayirildi.`);
        setTimeout(() => setSuccessMsg(''), 4000);
    };

    const inputStyle = {
        width: '100%', background: 'var(--bg-body)', border: '1px solid var(--border)',
        borderRadius: '10px', padding: '10px 14px', outline: 'none',
        fontSize: '0.9rem', color: 'var(--text-main)'
    };

    return (
        <div className="animate-fade-in" style={{ position: 'relative' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ChefHat size={28} color="var(--primary)" /> TAYYORLASH / RETSEPTLAR
                    </h1>
                    <p style={{ color: 'var(--text-dim)', marginTop: '4px' }}>
                        Taom retseptini kiriting. Tayyorlaganda masalliqlar avtomatik ombordan ayiriladi.
                    </p>
                </div>
                <button onClick={openModal} className="neon-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} /> Yangi retsept qo'shish
                </button>
            </div>

            {/* Notifications */}
            <AnimatePresence>
                {successMsg && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid var(--success)', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', color: 'var(--success)', fontWeight: '600' }}>
                        {successMsg}
                    </motion.div>
                )}
                {errorMsg && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid var(--danger)', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', color: 'var(--danger)', fontWeight: '600' }}>
                        {errorMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Recipe Cards */}
            {recipes.length === 0 ? (
                <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-dim)' }}>
                    <BookOpen size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
                    <p style={{ fontSize: '1.1rem' }}>Hali retsept yo'q. Yangi retsept qo'shing!</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
                    <AnimatePresence>
                        {recipes.map(recipe => {
                            const checks = checkAvailability(recipe);
                            const canCook = checks.every(c => c.enough);
                            return (
                                <motion.div key={recipe.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass-card" style={{ padding: '1.5rem' }}>
                                    {/* Card Header */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ background: 'var(--primary)', borderRadius: '10px', padding: '8px', display: 'flex' }}>
                                                <ChefHat size={20} color="var(--accent)" />
                                            </div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>{recipe.name}</h3>
                                        </div>
                                        <button onClick={() => deleteRecipe(recipe.id)}
                                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--danger)', padding: '4px' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    {/* Ingredients List */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.5rem' }}>
                                        {checks.map((ing, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                padding: '8px 12px', background: 'var(--bg-body)', borderRadius: '8px',
                                                borderLeft: `3px solid ${ing.enough ? 'var(--success)' : 'var(--danger)'}`
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <Package size={14} color="var(--text-dim)" />
                                                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{ing.name}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                                                        Kerak: <b>{ing.qty} {ing.unit}</b>
                                                    </span>
                                                    <span style={{ fontSize: '0.8rem', color: ing.enough ? 'var(--success)' : 'var(--danger)', fontWeight: '700' }}>
                                                        / Mavjud: {ing.available} {ing.unit}
                                                    </span>
                                                    {ing.enough
                                                        ? <CheckCircle size={16} color="var(--success)" />
                                                        : <XCircle size={16} color="var(--danger)" />
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Status & Cook Button */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
                                            borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700',
                                            background: canCook ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                                            color: canCook ? 'var(--success)' : 'var(--danger)'
                                        }}>
                                            {canCook ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                                            {canCook ? 'Tayyor — ombor yetarli' : 'Ombor yetarli emas'}
                                        </div>
                                        <button
                                            onClick={() => handleCook(recipe)}
                                            disabled={!canCook}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '6px',
                                                padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: canCook ? 'pointer' : 'not-allowed',
                                                background: canCook ? 'var(--primary)' : 'var(--border)',
                                                color: canCook ? 'var(--accent)' : 'var(--text-dim)',
                                                fontWeight: '700', fontSize: '0.9rem', transition: '0.3s'
                                            }}>
                                            <Play size={16} /> Tayyorla
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}

            {/* Add Recipe Modal */}
            <AnimatePresence>
                {showModal && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 2000
                    }}>
                        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                background: 'white',
                                width: '100vw',
                                height: '100vh',
                                padding: '40px',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                            {/* Modal Content Wrapper to control width */}
                            <div style={{ width: '100%', maxWidth: '1200px' }}>
                                {/* Modal Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                                    <h2 style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '-0.5px' }}>Yangi retsept qo'shish</h2>
                                    <button onClick={() => setShowModal(false)}
                                        style={{ background: 'var(--bg-body)', border: 'none', borderRadius: '15px', padding: '12px', cursor: 'pointer', display: 'flex' }}>
                                        <X size={28} />
                                    </button>
                                </div>

                                <form onSubmit={handleSaveRecipe} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {/* Dish Name */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-dim)', marginBottom: '8px' }}>
                                            TAOM NOMI
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Masalan: Hot-Dog, Lavash, Burger..."
                                            value={dishName}
                                            onChange={e => setDishName(e.target.value)}
                                            style={inputStyle}
                                        />
                                    </div>

                                    {/* Ingredients */}
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-dim)' }}>
                                                MASALLIQLAR
                                            </label>
                                            <button type="button" onClick={addIngredientRow}
                                                style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-body)', border: '1px solid var(--primary)', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem' }}>
                                                <Plus size={14} /> Masalliq qo'shish
                                            </button>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {ingredients.map((ing, idx) => {
                                                const selectedInv = inventory.find(inv => String(inv.id) === String(ing.inventoryId));
                                                return (
                                                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '8px', alignItems: 'center' }}>
                                                        {/* Select from inventory or type */}
                                                        <div>
                                                            {inventory.length > 0 ? (
                                                                <select
                                                                    value={ing.inventoryId}
                                                                    onChange={e => updateIngredient(idx, 'inventoryId', e.target.value)}
                                                                    style={inputStyle}
                                                                >
                                                                    <option value="">— Tanlang —</option>
                                                                    {inventory.map(inv => (
                                                                        <option key={inv.id} value={inv.id}>
                                                                            {inv.item} ({inv.stock} {inv.unit})
                                                                        </option>
                                                                    ))}
                                                                    <option value="__custom__">✏️ O'zim yozaman</option>
                                                                </select>
                                                            ) : (
                                                                <input type="text" placeholder="Masalliq nomi"
                                                                    value={ing.customName}
                                                                    onChange={e => updateIngredient(idx, 'customName', e.target.value)}
                                                                    style={inputStyle} />
                                                            )}
                                                            {ing.inventoryId === '__custom__' && (
                                                                <input type="text" placeholder="Masalliq nomini yozing"
                                                                    value={ing.customName}
                                                                    onChange={e => updateIngredient(idx, 'customName', e.target.value)}
                                                                    style={{ ...inputStyle, marginTop: '8px' }} />
                                                            )}
                                                        </div>
                                                        {/* Quantity */}
                                                        <input type="number" placeholder="Miqdor" min="0.01" step="0.01"
                                                            value={ing.qty}
                                                            onChange={e => updateIngredient(idx, 'qty', e.target.value)}
                                                            style={inputStyle} required />
                                                        {/* Unit */}
                                                        <input type="text" placeholder="Birlik"
                                                            value={ing.unit}
                                                            onChange={e => updateIngredient(idx, 'unit', e.target.value)}
                                                            style={inputStyle}
                                                            readOnly={!!selectedInv && ing.inventoryId !== '__custom__'}
                                                        />
                                                        {/* Remove */}
                                                        <button type="button" onClick={() => removeIngredientRow(idx)}
                                                            style={{ background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '8px', padding: '10px', cursor: 'pointer', color: 'var(--danger)' }}>
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <button type="submit" className="neon-btn" style={{ width: '100%', padding: '14px', marginTop: '0.5rem' }}>
                                        Retseptni saqlash
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Recipes;
