"use client";
import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import { X } from "lucide-react";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  instantMeeting?: boolean;
  image?: string;
  buttonClassName?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  instantMeeting,
  image,
  buttonClassName,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="border-0 bg-transparent p-0 shadow-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-[520px] mx-auto"
            >
              {/* Background with glassmorphism */}
              <div className="relative overflow-hidden rounded-2xl backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                {/* Content */}
                <div className="p-8 space-y-6">
                  {/* Image */}
                  {image && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                      className="flex justify-center"
                    >
                      <div className="p-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-white/20">
                        <Image src={image} alt="modal icon" width={48} height={48} />
                      </div>
                    </motion.div>
                  )}

                  {/* Title */}
                  <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                    className={cn("text-2xl md:text-3xl font-bold text-white", className)}
                  >
                    {title}
                  </motion.h1>

                  {/* Children content */}
                  {children && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      {children}
                    </motion.div>
                  )}

                  {/* Action Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                  >
                    <Button
                      onClick={handleClick}
                      className={cn(
                        "w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-medium rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-emerald-500/50",
                        buttonClassName
                      )}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {buttonIcon && (
                          <Image
                            src={buttonIcon}
                            alt="button icon"
                            width={16}
                            height={16}
                          />
                        )}
                        <span>{buttonText || "Schedule Meeting"}</span>
                      </div>
                    </Button>
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-2xl" />
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default MeetingModal;
