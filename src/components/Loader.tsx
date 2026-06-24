import { motion, AnimatePresence } from "framer-motion";
import { RingMark } from "./RingMark";

interface LoaderProps {
  show: boolean;
}

export function Loader({ show }: LoaderProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-5"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <RingMark size={48} />
            </motion.div>
            <motion.span
              className="font-display italic text-sm text-bone-dim tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Rays Piercings
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
