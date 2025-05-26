import type { ProductEnum } from "@core/types";

// productImages.ts
const imageMap = import.meta.glob("../../assets/*.png", {
    eager: true,
    import: "default"
}) as Record<string, string>;

export function getProductImage(productKey: ProductEnum | null): string | undefined {
    if (!productKey) return undefined;
    const key = `../../assets/${productKey.toLowerCase()}.png`;
    return imageMap[key];
}
