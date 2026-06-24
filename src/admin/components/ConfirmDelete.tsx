import { Modal } from "../../components/Modal";

interface ConfirmDeleteProps {
  open: boolean;
  itemName: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function ConfirmDelete({ open, itemName, onCancel, onConfirm, loading }: ConfirmDeleteProps) {
  return (
    <Modal open={open} onClose={onCancel} title="Confirmer la suppression">
      <p className="text-sm text-bone-dim mb-6">
        Voulez-vous vraiment supprimer <span className="text-white">{itemName}</span> ?
        Cette action est définitive.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2.5 rounded-full border border-white/15 text-white text-sm hover:border-white/30 transition-colors"
        >
          Annuler
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 px-4 py-2.5 rounded-full bg-red-500/90 text-white text-sm hover:bg-red-500 transition-colors disabled:opacity-60"
        >
          {loading ? "Suppression..." : "Supprimer"}
        </button>
      </div>
    </Modal>
  );
}
