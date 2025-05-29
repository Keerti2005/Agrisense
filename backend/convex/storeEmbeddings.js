export default async function storeEmbeddings({ id, vector, text }) {
    await db.collection('embeddings').insertOne({
      _id: id,
      vector: vector,
      text: text,
    });
  }