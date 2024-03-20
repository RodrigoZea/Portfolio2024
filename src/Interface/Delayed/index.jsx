import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Delayed({ children, waitBeforeShow = 1000 }) {
    

    return( 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {children}
      </motion.div>
    )
}