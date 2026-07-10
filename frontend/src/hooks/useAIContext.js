import { useAIContext as useAIContextBase } from "@/contexts/AIContext";

export function useAIContext() {
  const { aiContext, healthDomain } = useAIContextBase();
  return {
    ...aiContext,
    healthDomain
  };
}
