import { motion } from "framer-motion";
import GlassCard from "../../components/ui/GlassCard";

const TrustCard = ({
  icon: Icon,
  value,
  label,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <GlassCard className="flex flex-col items-center justify-center gap-4 p-8 text-center">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
          <Icon size={30} />
        </div>

        <h2 className="text-4xl font-extrabold text-gray-900">
          {value}
        </h2>

        <p className="text-gray-500">
          {label}
        </p>

      </GlassCard>
    </motion.div>
  );
};

export default TrustCard;