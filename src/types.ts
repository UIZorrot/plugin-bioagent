import { z } from "zod";
// src/types.ts
export * from "./services/scaich/types"; // 添加 SCAI 类型

export const DKGMemorySchema = z.object({
    "@context": z.literal("http://schema.org"),
    "@type": z.literal("SocialMediaPosting"),
    headline: z.string(),
    articleBody: z.string(),
    about: z.array(
        z.object({
            "@type": z.literal("Thing"),
            "@id": z.string(),
            name: z.string(),
            url: z.string(),
        })
    ),
    keywords: z.array(
        z.object({
            "@type": z.literal("Text"),
            "@id": z.string(),
            name: z.string(),
        })
    ),
});

export const DKGSelectQuerySchema = z.object({
    query: z.string().startsWith("SELECT"),
});

export type DKGMemoryContent = z.infer<typeof DKGMemorySchema>;
export type DKGSelectQuery = z.infer<typeof DKGSelectQuerySchema>;
export type DKGQueryResultEntry = Record<string, string>;

export const isDKGMemoryContent = (
    object: unknown
): object is DKGMemoryContent => {
    return DKGMemorySchema.safeParse(object).success;
};

export const isDKGSelectQuery = (object: unknown): object is DKGSelectQuery => {
    return DKGSelectQuerySchema.safeParse(object).success;
};

export const scientificPaperUrlsSchema = z.object({
    urls: z.array(z.string().url()),
});

export type ScientificPaperUrls = z.infer<typeof scientificPaperUrlsSchema>;
