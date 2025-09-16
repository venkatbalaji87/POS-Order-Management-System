import { useEffect, useState } from "react";

export function usePersistentCart(store) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    (async () => {
      const saved = await store.getAll("orders");
      const draft = saved.find(o => o.status === "draft");
      if (draft) setCart(draft.items);
    })();
  }, [store]);

  const updateCart = async (items) => {
    setCart(items);
    const draft = {
      id: "draft-cart",
      items,
      status: "draft",
      total: items.reduce((s, i) => s + i.price * i.qty, 0),
    };
    await store.put("orders", draft);
  };

  return [cart, updateCart];
}
