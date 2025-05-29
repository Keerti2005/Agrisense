import { ConvexHttpClient } from "convex/browser";
const httpClient = new ConvexHttpClient(
  "https://cheerful-mule-131.convex.cloud"
);

const dp = httpClient.db;
export async function queryEmbeddings(queryVector) {
    const embeddings = await db.collection('embeddings').find().toArray();
  
    const results = embeddings.map(embedding => ({
      id: embedding._id,
      similarity: calculateSimilarity(queryVector, embedding.vector),
      text: embedding.text
    }));
  
    results.sort((a, b) => b.similarity - a.similarity);
  
    return results.slice(0, 5);
  }
  
  function calculateSimilarity(vector1, vector2) {
    return Math.random();
  }