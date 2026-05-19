const onDragEndEdit = ({ active, over }) => {
  if (!over || active.id === over.id) return;

  setEditImages((items) => {
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const reordered = arrayMove(items, oldIndex, newIndex);
    saveOrder(reordered);

    return reordered;
  });
};
