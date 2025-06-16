"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface ShipmentItem {
  title: string;
  img: string;
  quantity: number;
  price: number;
  description: string;
}

export default function AddShipment() {
  const router = useRouter();
  const [lockerNumber, setLockerNumber] = useState("");
  const [items, setItems] = useState<ShipmentItem[]>([
    { title: "", img: "", quantity: 1, price: 0, description: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<{
    [key: number]: boolean;
  }>({});
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const addItem = () => {
    setItems([
      ...items,
      { title: "", img: "", quantity: 1, price: 0, description: "" },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: keyof ShipmentItem,
    value: string | number
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleImageUpload = async (index: number, file: File) => {
    if (!file) return;

    setUploadingImages((prev) => ({ ...prev, [index]: true }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload image");
      }

      const data = await response.json();
      updateItem(index, "img", data.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload image"
      );
    } finally {
      setUploadingImages((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/locker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lockerNumber,
          items,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create shipment");
      }

      toast.success("Shipment created successfully");
      router.push("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create shipment"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Shipment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="lockerNumber">Locker Number</Label>
              <Input
                id="lockerNumber"
                value={lockerNumber}
                onChange={(e) => setLockerNumber(e.target.value)}
                placeholder="Enter locker number"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Items</h3>
                <Button type="button" onClick={addItem} variant="outline">
                  Add Item
                </Button>
              </div>

              {items.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Item {index + 1}</h4>
                      {items.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeItem(index)}
                          variant="destructive"
                          size="sm"
                        >
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${index}`}>Title</Label>
                        <Input
                          id={`title-${index}`}
                          value={item.title}
                          onChange={(e) =>
                            updateItem(index, "title", e.target.value)
                          }
                          placeholder="Enter item title"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Image</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(index, file);
                            }}
                            ref={(el) => (fileInputRefs.current[index] = el)}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            onClick={() =>
                              fileInputRefs.current[index]?.click()
                            }
                            disabled={uploadingImages[index]}
                            variant="outline"
                          >
                            {uploadingImages[index]
                              ? "Uploading..."
                              : "Upload Image"}
                          </Button>
                          {item.img && (
                            <div className="relative w-16 h-16">
                              <Image
                                src={item.img}
                                alt={item.title || "Item image"}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                        <Input
                          id={`quantity-${index}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "quantity",
                              parseInt(e.target.value)
                            )
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`price-${index}`}>Price (₹)</Label>
                        <Input
                          id={`price-${index}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.price}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "price",
                              parseFloat(e.target.value)
                            )
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${index}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`description-${index}`}
                        value={item.description}
                        onChange={(e) =>
                          updateItem(index, "description", e.target.value)
                        }
                        placeholder="Enter item description"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Shipment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
