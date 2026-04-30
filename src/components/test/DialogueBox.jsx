// DialogueBox.jsx
import { motion } from 'framer-motion';

export const DialogueBox = ({ name, text }) => (
  <motion.div 
    initial={{ opacity: 0, y: 100, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="dialogueBox-container"
  >
    <div className="dialogueBox-name"><h1>{name}</h1></div>
    <div className="dialogueBox-divider"></div>
    <div className="dialogueBox-text">
        <p>{text}</p>
    </div>
  </motion.div>
);  