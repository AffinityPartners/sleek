import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modal component with click-outside-to-close and escape key support.
 * Uses Framer Motion for smooth enter/exit animations.
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  /**
   * Handle escape key to close modal.
   * Adds event listener when modal opens, removes it when modal closes.
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay - clicking this closes the modal. z-[9998] ensures it's above most content but below the modal panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9998] bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal container - z-[9999] ensures it's above the backdrop */}
          <div
            className="fixed inset-0 z-[9999] overflow-y-auto pointer-events-none"
            role="dialog"
            aria-modal="true"
          >
            <div className="min-h-screen px-4 flex items-center justify-center">
              {/* Modal panel - pointer-events-auto re-enables clicks on the modal itself */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={`relative w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-2xl ring-1 ring-black/5 pointer-events-auto ${sizeClasses[size]}`}
              >
                {title && (
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </h3>
                )}
                <div className={title ? 'mt-4' : ''}>{children}</div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
} 