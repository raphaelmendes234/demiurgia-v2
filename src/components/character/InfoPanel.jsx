import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseButtonComponent } from "../ui/CloseButtonComponent";

export const InfoPanel = ({
  isOpen,
  onClose,
  characterName,
  characterInfo,
  characterImageInfo,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="panel-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="info-panel-container"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="panel-close-btn">
              <CloseButtonComponent onClick={onClose} />
            </div>

            <div className="panel-content-wrapper">

              <div>
              <h2 className="character-title">{characterName}</h2>

              <div className="panel-divider-container">
                <img src="/assets/info/UI2.png" alt="" className="panel-divider" />
              </div></div>

              {characterImageInfo && (
                <div className="character-portrait-container">
                  <img
                    src={characterImageInfo}
                    alt={characterName}
                    className="character-portrait"
                  />
                </div>
              )}

              <div className="character-description">
                <p>{characterInfo}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
