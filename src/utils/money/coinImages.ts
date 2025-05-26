import type { CoinEnum } from "@core/types";

// productImages.ts
const imageMap = import.meta.glob("../../assets/*.png", {
    eager: true,
    import: "default"
}) as Record<string, string>;

export function getCoinImage(coinKey: CoinEnum): string | undefined {
    const key = `../../assets/${coinKey.toLowerCase()}.png`;
    return imageMap[key];
}
