import { motion } from "framer-motion";
import { Mouse } from "lucide-react";

const HeroScroll = () => {
    return (

        <motion.div

            animate={{
                y: [0, 10, 0]
            }}

            transition={{
                repeat: Infinity,
                duration: 2
            }}

            className="
            absolute
            bottom-8
            left-1/2
            -translate-x-1/2
            flex
            flex-col
            items-center
            gap-2
            text-gray-500
            "

        >

            <Mouse size={24} />

            <span className="text-sm">

                Scroll

            </span>

        </motion.div>

    );
};

export default HeroScroll;