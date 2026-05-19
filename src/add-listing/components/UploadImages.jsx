import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

/* Firebase */
import { storage } from "./../../../configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

/* Database */
import { db } from "./../../../configs";
import { CarImages } from "./../../../configs/schema";
import { eq } from "drizzle-orm";

/* DND KIT */
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ================= SORTABLE ITEM ================= */
function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-move touch-none"
    >
      {children}
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */
function UploadImages({
  triggleUploadImages,
  setLoader,
  carInfo,
  mode,
  onHasImagesChange,
  onUploadFinished,
}) {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [editImages, setEditImages] = useState([]);

  /* ================= DND SENSORS ================= */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
  );

  /* ================= INIT ================= */
  useEffect(() => {
    if (mode === "edit" && carInfo?.images) {
      const sorted = [...carInfo.images].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      );
      setEditImages(sorted);
    }
  }, [carInfo, mode]);

  useEffect(() => {
    const total =
      (mode === "edit" ? editImages.length : 0) + selectedFileList.length;
    onHasImagesChange?.(total > 0);
  }, [selectedFileList, editImages, mode]);

  useEffect(() => {
    if (triggleUploadImages && mode !== "edit") {
      uploadImageToServer();
    }
  }, [triggleUploadImages]);

  /* ================= FILE SELECT ================= */
  const onFileSelected = async (e) => {
    const files = Array.from(e.target.files);
    setSelectedFileList((prev) => [...prev, ...files]);

    if (mode === "edit") {
      await uploadImageToServer(files);
    }
  };

  /* ================= UPLOAD ================= */
  const uploadImageToServer = async (files = selectedFileList) => {
    if (!files.length) return;

    const listingId = mode === "edit" ? carInfo?.id : triggleUploadImages;
    if (!listingId) return;

    setLoader(true);

    let startOrder = mode === "edit" ? editImages.length : 0;

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `car-marketplace/${fileName}`);

      await uploadBytes(storageRef, file, {
        contentType: file.type,
      });

      const imageUrl = await getDownloadURL(storageRef);

      const inserted = await db
        .insert(CarImages)
        .values({
          imageUrl,
          carListingId: listingId,
          order: startOrder,
        })
        .returning();

      startOrder++;

      if (mode === "edit") {
        setEditImages((prev) => [...prev, inserted[0]]);
      }
    }

    setSelectedFileList([]);
    setLoader(false);

    if (mode !== "edit") {
      onUploadFinished?.();
    }
  };

  /* ================= DELETE ================= */
  const removeFromDb = async (image) => {
    await db.delete(CarImages).where(eq(CarImages.id, image.id));

    const updated = editImages.filter((i) => i.id !== image.id);
    setEditImages(updated);
    await saveOrder(updated);
  };

  const removeNew = (index) => {
    setSelectedFileList((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= SAVE ORDER ================= */
  const saveOrder = async (images) => {
    for (let i = 0; i < images.length; i++) {
      await db
        .update(CarImages)
        .set({ order: i })
        .where(eq(CarImages.id, images[i].id));
    }
  };

  /* =================  HANDLER ================= */
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

  const onDragEndNew = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    setSelectedFileList((items) => {
      const oldIndex = active.id;
      const newIndex = over.id;
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  /* ================= UI ================= */
  return (
    <div>
      <h2 className="font-medium text-xl my-3">Prześlij zdjęcia samochodu</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {/* EDIT MODE */}
        {mode === "edit" && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEndEdit}
          >
            <SortableContext
              items={editImages.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              {editImages.map((image, index) => (
                <SortableItem key={image.id} id={image.id}>
                  <div className="relative group">
                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded z-10">
                        Główne zdjęcie
                      </span>
                    )}

                    <IoMdCloseCircle
                      className="absolute top-2 right-2 text-lg text-white opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                      onClick={() => removeFromDb(image)}
                    />

                    <img
                      src={image.imageUrl}
                      className="w-full h-[130px] object-cover rounded-xl border group-hover:ring-2 group-hover:ring-primary"
                    />
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        )}

        {/* ADD MODE */}
        {selectedFileList.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEndNew}
          >
            <SortableContext
              items={selectedFileList.map((_, i) => i)}
              strategy={rectSortingStrategy}
            >
              {selectedFileList.map((file, index) => (
                <SortableItem key={index} id={index}>
                  <div className="relative group">
                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded z-10">
                        Główne zdjęcie
                      </span>
                    )}

                    <IoMdCloseCircle
                      className="absolute top-2 right-2 text-lg text-white opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                      onClick={() => removeNew(index)}
                    />

                    <img
                      src={URL.createObjectURL(file)}
                      className="w-full h-[130px] object-cover rounded-xl border group-hover:ring-2 group-hover:ring-primary"
                    />
                  </div>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        )}

        {/* ADD BUTTON */}
        <label htmlFor="upload-images">
          <div className="border-2 border-dashed border-primary bg-blue-50 p-10 rounded-xl cursor-pointer hover:bg-blue-100 flex justify-center items-center">
            <span className="text-primary text-2xl">+</span>
          </div>
        </label>

        <input
          id="upload-images"
          type="file"
          multiple
          className="hidden"
          onChange={onFileSelected}
        />
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Przeciągnij obrazy, aby zmienić kolejność. Pierwszy obraz jest zdjęciem
        głównym.
      </p>
    </div>
  );
}

export default UploadImages;
