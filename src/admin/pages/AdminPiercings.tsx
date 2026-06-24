import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Modal } from "../../components/Modal";
import { ConfirmDelete } from "../components/ConfirmDelete";
import { ImageUploader } from "../components/ImageUploader";
import { FieldWrap, TextInput, TextArea } from "../../components/FormFields";
import {
  fetchPiercings,
  createPiercing,
  updatePiercing,
  deletePiercing,
} from "../../lib/dataService";
import type { PiercingRow } from "../../lib/types";

const emptyForm = {
  name: "",
  zone: "",
  description: "",
  healing: "",
  pain: 2,
  image_url: null as string | null,
  position: 0,
};

export function AdminPiercings() {
  const [items, setItems] = useState<PiercingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<PiercingRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const [toDelete, setToDelete] = useState<PiercingRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await fetchPiercings();
      setItems(data);
    } catch (err) {
      setErrorMsg(
        "Impossible de charger les piercings. Vérifie la configuration Supabase (voir README)."
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
        const data = await fetchPiercings();
        if (!cancelled) setItems(data);
      } catch (err) {
        if (!cancelled) {
          setErrorMsg(
            "Impossible de charger les piercings. Vérifie la configuration Supabase (voir README)."
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

  const openEdit = (item: PiercingRow) => {
    setEditing(item);
    setForm({
      name: item.name,
      zone: item.zone,
      description: item.description,
      healing: item.healing,
      pain: item.pain,
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
        await updatePiercing(editing.id, form);
      } else {
        await createPiercing(form);
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
      await deletePiercing(toDelete.id);
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
        <h2 className="font-display text-2xl text-white">Piercings</h2>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-ink text-sm font-medium hover:bg-silver-light transition-colors"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {errorMsg && (
        <p className="text-sm text-red-400 mb-4">{errorMsg}</p>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-bone-faint">
          <Loader2 size={20} className="animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-bone-faint py-10 text-center">
          Aucun piercing pour le moment. Ajoute le premier.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-ink-card border border-white/[0.06] overflow-hidden"
            >
              <div className="aspect-[4/3] bg-ink-soft">
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
                  <h3 className="font-display text-lg text-white">{item.name}</h3>
                  <span className="font-mono text-[10px] uppercase text-bone-faint">
                    {item.zone}
                  </span>
                </div>
                <p className="text-xs text-bone-dim line-clamp-2 mb-4">
                  {item.description}
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
        title={editing ? "Modifier le piercing" : "Ajouter un piercing"}
      >
        <form onSubmit={handleSave}>
          <FieldWrap label="Nom" required>
            <TextInput
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ex: Hélix"
            />
          </FieldWrap>

          <FieldWrap label="Zone" required>
            <TextInput
              required
              value={form.zone}
              onChange={(e) => setForm({ ...form, zone: e.target.value })}
              placeholder="Ex: Oreille"
            />
          </FieldWrap>

          <FieldWrap label="Description" required>
            <TextArea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </FieldWrap>

          <FieldWrap label="Temps de cicatrisation" required>
            <TextInput
              required
              value={form.healing}
              onChange={(e) => setForm({ ...form, healing: e.target.value })}
              placeholder="Ex: 3 à 6 mois"
            />
          </FieldWrap>

          <FieldWrap label="Niveau de douleur (1 à 5)" required>
            <TextInput
              required
              type="number"
              min={1}
              max={5}
              value={form.pain}
              onChange={(e) => setForm({ ...form, pain: Number(e.target.value) })}
            />
          </FieldWrap>

          <div className="mb-5">
            <ImageUploader
              folder="piercings"
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
