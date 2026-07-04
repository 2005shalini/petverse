import { motion } from "framer-motion";
import GlassCard from "../../components/ui/GlassCard";
import useMouseParallax from "../../hooks/useMouseParallax";


const HeroFloatingCard = ({
  icon,
  title,
  value,
  className,
}) => {
  const { x, y } = useMouseParallax(8);
  return (
    <motion.div
    style={{x,y}}
      animate={{
        y: [0, -10, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute z-20 ${className}`}
    >
      <GlassCard className="w-52 p-5">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
            {icon}
          </div>

          <div>

            <p className="text-sm text-gray-500">
              {title}
            </p>

            <h3 className="font-bold text-lg">
              {value}
            </h3>

          </div>

        </div>

      </GlassCard>
    </motion.div>
  );
};

export default HeroFloatingCard;