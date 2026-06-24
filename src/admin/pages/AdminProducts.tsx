import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Modal } from "../../components/Modal";
import { ConfirmDelete } from "../components/ConfirmDelete";
import { ImageUploader } from "../components/ImageUploader";
import { FieldWrap, TextInput, TextArea } from "../../components/FormFields";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../lib/dataService";
import type { ProductRow } from "../../lib/types";

const emptyForm = {
  name: "",
  category: "",
  price: 0,
  material: "",
  description: "",
  image_url: null as string | null,
  position: 0,
};

export function AdminProducts() {
  const [items, setItems] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [toDelete, setToDelete] = useState<ProductRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await fetchProducts();
      setItems(data);
    } catch (err) {
      setErrorMsg(
        "Impossible de charger les produits. Vérifie la configuration Supabase (voir README)."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const data = await fetchProducts();
        if (!cancelled) setItems(data);
      } catch (err) {
        if (!cancelled) {
          setErrorMsg(
            "Impossible de charger les produits. Vérifie la configuration Supabase (voir README)."
          );
        }
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, position: items.length });
    setFormOpen(true);
  };

  const openEdit = (item: ProductRow) => {
    setEditing(item);
    setForm({
      name: item.name,
      category: item.category,
      price: item.price,
      material: item.material,
      description: item.description,
      image_url: item.image_url,
      position: item.position,
    });
    setFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateProduct(editing.id, form);
      } else {
        await createProduct(form);
      }
      setFormOpen(false);
      await load();
    } catch (err) {
      setErrorMsg("Échec de l'enregistrement. Réessaie.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteProduct(toDelete.id);
      setToDelete(null);
      await load();
    } catch (err) {
      setErrorMsg("Échec de la suppression.");
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-white">Boutique</h2>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-ink text-sm font-medium hover:bg-silver-light transition-colors"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {errorMsg && <p className="text-sm text-red-400 mb-4">{errorMsg}</p>}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-bone-faint">
          <Loader2 size={20} className="animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-bone-faint py-10 text-center">
          Aucun produit pour le moment. Ajoute le premier.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-ink-card border border-white/[0.06] overflow-hidden"
            >
              <div className="aspect-square bg-ink-soft">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-display text-base text-white leading-snug">
                    {item.name}
                  </h3>
                  <span className="font-mono text-sm text-silver shrink-0">
                    {item.price} DA
                  </span>
                </div>
                <p className="text-xs text-bone-faint uppercase tracking-wide mb-3">
                  {item.category}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-white/15 text-xs text-white hover:border-silver/40 transition-colors"
                  >
                    <Pencil size={13} /> Modifier
                  </button>
                  <button
                    onClick={() => setToDelete(item)}
                    className="flex items-center justify-center px-3 py-2 rounded-full border border-white/15 text-red-400 hover:border-red-400/50 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? "Modifier le produit" : "Ajouter un produit"}
      >
        <form onSubmit={handleSave}>
          <FieldWrap label="Nom" required>
            <TextInput
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ex: Anneau Saturne"
            />
          </FieldWrap>

          <FieldWrap label="Catégorie" required>
            <TextInput
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Ex: Anneaux"
            />
          </FieldWrap>

          <FieldWrap label="Prix (DA)" required>
            <TextInput
              required
              type="number"
              min={0}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            />
          </FieldWrap>

          <FieldWrap label="Matière" required>
            <TextInput
              required
              value={form.material}
              onChange={(e) => setForm({ ...form, material: e.target.value })}
              placeholder="Ex: Titane chirurgical"
            />
          </FieldWrap>

          <FieldWrap label="Description" required>
            <TextArea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </FieldWrap>

          <div className="mb-5">
            <ImageUploader
              folder="products"
              value={form.image_url}
              onChange={(url) => setForm({ ...form, image_url: url })}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full mt-2 px-5 py-3.5 rounded-full bg-white text-ink text-sm font-medium hover:bg-silver-light transition-colors disabled:opacity-60"
          >
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      </Modal>

      <ConfirmDelete
        open={!!toDelete}
        itemName={toDelete?.name || ""}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
