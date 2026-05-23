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
    const [ingredients, setIngredients] = useState([]);
    const [tempIng, setTempIng] = useState({ inventoryId: '', customName: '', qty: '', unit: '' });

    // Refresh inventory on mount and when modal opens
    useEffect(() => {
        setInventoryState(getInventory());
    }, [showModal, successMsg]);

    const openModal = () => {
        setDishName('');
        setIngredients([]);
        setTempIng({ inventoryId: '', customName: '', qty: '', unit: '' });
        setShowModal(true);
    };

    const confirmTempIngredient = () => {
        if (!tempIng.qty || (!tempIng.inventoryId && !tempIng.customName)) return;

        setIngredients([tempIng, ...ingredients]);
        setTempIng({ inventoryId: '', customName: '', qty: '', unit: '' });
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

    const updateTempIng = (field, value) => {
        if (field === 'inventoryId') {
            if (value === '__custom__') {
                setTempIng({ ...tempIng, inventoryId: '__custom__', customName: '' });
            } else {
                const invItem = inventory.find(inv => String(inv.id) === String(value));
                setTempIng({ ...tempIng, inventoryId: value, unit: invItem ? invItem.unit : tempIng.unit, customName: '' });
            }
        } else {
            setTempIng({ ...tempIng, [field]: value });
        }
    };

    const handleSaveRecipe = (e) => {
        e.preventDefault();

        let finalIngredients = [...ingredients];
        // Auto-include tempIng if valid
        if (tempIng.qty && (tempIng.inventoryId || tempIng.customName)) {
            finalIngredients = [tempIng, ...finalIngredients];
        }

        if (!dishName.trim() || finalIngredients.length === 0) {
            setErrorMsg('Iltimos, taom nomi va kamida bitta masalliq kiriting.');
            setTimeout(() => setErrorMsg(''), 3000);
            return;
        }

        const newRecipe = {
            id: Date.now(),
            name: dishName.trim(),
            ingredients: finalIngredients.map(ing => {
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

    const checkAvailability = (recipe) => {
        const inv = getInventory();
        return recipe.ingredients.map(ing => {
            const invItem = inv.find(i => String(i.id) === String(ing.inventoryId));
            const available = invItem ? invItem.stock : 0;
            const enough = available >= ing.qty;
            return { ...ing, available, enough, invItem };
        });
    };

    const handleCook = (recipe) => {
        const inv = getInventory();
        const checks = checkAvailability(recipe);
        const missing = checks.filter(c => !c.enough);

        if (missing.length > 0) {
            setErrorMsg(`Omborda yetarli emas: ${missing.map(m => `${m.name}`).join(', ')}`);
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
        setSuccessMsg(`✅ "${recipe.name}" tayyor!`);
        setTimeout(() => setSuccessMsg(''), 4000);
    };

    const inputStyle = {
        width: '100%',
        background: 'var(--bg-body)',
        border: '1.5px solid var(--border)',
        borderRadius: '16px',
        padding: '16px 22px',
        outline: 'none',
        fontSize: '1.1rem',
        color: 'var(--text-main)',
        transition: '0.3s',
        fontWeight: '600'
    };

    return (
        <div className="animate-fade-in" style={{ padding: '1rem', paddingBottom: '5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <ChefHat size={40} color="var(--primary)" /> Tayyorlash
                    </h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>Retseptlar va ombor nazorati.</p>
                </div>
                <button onClick={openModal} className="neon-btn" style={{ padding: '14px 28px', fontSize: '1rem', fontWeight: '700', borderRadius: '15px' }}>
                    <Plus size={20} /> Yangi retsept
                </button>
            </div>

            {/* Notifications */}
            <AnimatePresence>
                {(successMsg || errorMsg) && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{
                            background: successMsg ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                            border: `1px solid ${successMsg ? 'var(--success)' : 'var(--danger)'}`,
                            borderRadius: '16px', padding: '1rem 2rem', marginBottom: '2rem',
                            color: successMsg ? 'var(--success)' : 'var(--danger)',
                            fontWeight: '700', fontSize: '1.1rem', textAlign: 'center'
                        }}>
                        {successMsg || errorMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
                {recipes.map(recipe => {
                    const checks = checkAvailability(recipe);
                    const canCook = checks.every(c => c.enough);
                    return (
                        <motion.div key={recipe.id} className="glass-card" style={{ padding: '2rem', borderRadius: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>{recipe.name}</h3>
                                <button onClick={() => deleteRecipe(recipe.id)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2rem' }}>
                                {checks.map((ing, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', padding: '10px 15px', background: 'var(--bg-body)', borderRadius: '12px', borderLeft: `4px solid ${ing.enough ? 'var(--success)' : 'var(--danger)'}` }}>
                                        <span style={{ fontWeight: '700' }}>{ing.name}</span>
                                        <span style={{ color: 'var(--text-dim)' }}>{ing.qty} ({ing.available})</span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => handleCook(recipe)} disabled={!canCook} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: canCook ? 'var(--primary)' : 'var(--border)', color: canCook ? 'var(--accent)' : 'var(--text-dim)', fontWeight: '800', cursor: canCook ? 'pointer' : 'not-allowed' }}>
                                Tayyorlash
                            </button>
                        </motion.div>
                    );
                })}
            </div>

            {/* Balanced Full Screen Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'white', zIndex: 9999, display: 'flex', justifyContent: 'center', overflowY: 'auto' }}>
                        <div style={{ width: '100%', maxWidth: '1000px', padding: '4rem 2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                                <h2 style={{ fontSize: '2.8rem', fontWeight: '900', letterSpacing: '-1.5px' }}>YANGI RETSEPT</h2>
                                <button onClick={() => setShowModal(false)} style={{ background: 'var(--bg-body)', border: 'none', borderRadius: '20px', padding: '20px', cursor: 'pointer' }}>
                                    <X size={40} />
                                </button>
                            </div>

                            <form onSubmit={handleSaveRecipe} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '1rem', fontWeight: '800', color: 'var(--text-dim)', marginBottom: '12px' }}>TAOM NOMI</label>
                                    <input required type="text" placeholder="Masalan: Max-Burger..." value={dishName} onChange={e => setDishName(e.target.value)} style={inputStyle} />
                                </div>

                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        {/* Input Row (Always on Top) */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto auto', gap: '15px', alignItems: 'center', background: 'var(--bg-body)', padding: '20px', borderRadius: '24px', border: '2px dashed var(--primary)' }}>
                                            <div>
                                                {inventory.length > 0 ? (
                                                    <select value={tempIng.inventoryId} onChange={e => updateTempIng('inventoryId', e.target.value)} style={inputStyle}>
                                                        <option value="">— Ombordan tanlang —</option>
                                                        {inventory.map(inv => <option key={inv.id} value={inv.id}>{inv.item} ({inv.stock} {inv.unit})</option>)}
                                                        <option value="__custom__">✏️ Yangi/Boshqa</option>
                                                    </select>
                                                ) : (
                                                    <input type="text" placeholder="Masalliq nomi..." value={tempIng.customName} onChange={e => updateTempIng('customName', e.target.value)} style={inputStyle}
                                                        onKeyDown={(e) => e.key === 'Enter' && confirmTempIngredient()} />
                                                )}
                                                {tempIng.inventoryId === '__custom__' && <input type="text" placeholder="Yozing..." value={tempIng.customName} onChange={e => updateTempIng('customName', e.target.value)} style={{ ...inputStyle, marginTop: '10px' }}
                                                    onKeyDown={(e) => e.key === 'Enter' && confirmTempIngredient()} />}
                                            </div>
                                            <input type="number" placeholder="Miqdor" value={tempIng.qty} onChange={e => updateTempIng('qty', e.target.value)} style={inputStyle}
                                                onKeyDown={(e) => e.key === 'Enter' && confirmTempIngredient()} />

                                            <button type="button" onClick={confirmTempIngredient} disabled={!tempIng.qty}
                                                style={{
                                                    background: 'var(--primary)', border: 'none', borderRadius: '15px', padding: '18px',
                                                    cursor: tempIng.qty ? 'pointer' : 'not-allowed', color: 'var(--accent)',
                                                    opacity: tempIng.qty ? 1 : 0.5, boxShadow: '0 4px 15px rgba(173, 255, 47, 0.3)'
                                                }}>
                                                <CheckCircle size={24} />
                                            </button>
                                            <div style={{ width: '60px' }}></div> {/* Spacer for alignment */}
                                        </div>

                                        {/* Added Ingredients List */}
                                        <AnimatePresence>
                                            {ingredients.map((ing, idx) => (
                                                <motion.div key={idx}
                                                    initial={{ opacity: 0, y: -20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto auto', gap: '15px', alignItems: 'center', background: 'white', padding: '15px', borderRadius: '20px', border: '1.5px solid var(--border)' }}>
                                                    <div>
                                                        <input type="text" readOnly value={inventory.find(v => String(v.id) === String(ing.inventoryId))?.item || ing.customName} style={{ ...inputStyle, background: 'transparent', border: 'none', padding: '8px' }} />
                                                    </div>
                                                    <input type="number" value={ing.qty} onChange={e => updateIngredient(idx, 'qty', e.target.value)} style={{ ...inputStyle, padding: '12px' }} />

                                                    <div style={{ width: '60px', display: 'flex', justifyContent: 'center', color: 'var(--success)' }}>
                                                        <CheckCircle size={24} />
                                                    </div>

                                                    <button type="button" onClick={() => removeIngredientRow(idx)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '15px', padding: '18px', cursor: 'pointer', color: 'var(--danger)' }}>
                                                        <X size={24} />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <button type="submit" className="neon-btn" style={{ padding: '22px', fontSize: '1.4rem', fontWeight: '900', borderRadius: '20px' }}>
                                    SAQLASH
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Recipes;
