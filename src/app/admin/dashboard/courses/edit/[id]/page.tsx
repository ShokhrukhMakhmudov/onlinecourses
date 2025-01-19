"use client";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
import { ChangeEvent, FormEvent, useEffect, useState, memo } from "react";

const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
});

const MemoEditor = memo(Editor);

interface IFormData {
  title: string;
  author: string;
  description: string;
  duration: string;
  price: number | "";
  newPrice: number | "";
  language: "O'zbek" | "Русский" | "English";
  cover: string;
  status: boolean;
}
export default function page({ params: { id } }: { params: { id: string } }) {
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    author: "",
    description: "",
    price: "",
    newPrice: "",
    duration: "",
    language: "O'zbek",
    cover: "",
    status: true,
  });

  const [fileLoading, setFileLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const req = await fetch(`/api/course/get?id=${id}`);
        const res = await req.json();

        if (res?.success) {
          setFormData(res.course);
        } else {
          alert(res.message);
        }
      } catch (error) {
        alert(error);
      }
    }
    fetchCourse();
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);

    try {
      const req = await fetch("/api/course/update", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const res = await req.json();

      if (res?.success) {
        alert("Kurs muvaffaqiyatli o'zgartirildi!");
      }
    } catch (error) {
      console.log(error);
      alert("Kurs yaratishda xatolik yuz berdi!");
    }

    setLoading(false);
  };

  const handleDescChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "number" && value !== "") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
      return;
    }

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleReset = () =>
  //   setFormData({
  //     title: "",
  //     author: "",
  //     description: "",
  //     price: "",
  //     newPrice: "",
  //     language: "uz",
  //     cover: "",
  //   });
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setFileLoading(true);

    const formData = new FormData();
    formData.append("file", file as Blob);

    try {
      const req = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      const res = await req.json();

      if (res?.success) {
        setFormData((prev) => ({ ...prev, cover: res.path }));
      } else {
        throw new Error("Fayl yuklashda xatolik yuz berdi!");
      }
    } catch (error) {
      alert("Xatolik yuz berdi: " + error);
    }

    setFileLoading(false);
  };

  if (loading) return <Loader />;
  return (
    <div className="bg-base-100 h-full w-full rounded-lg shadow">
      <div className="w-full h-full p-4">
        <form
          className="needs-validation peer h-full flex flex-col gap-y-4"
          onSubmit={handleFormSubmit}>
          <div className="w-full">
            <h6 className="text-lg font-semibold">Kurs (Tahrirlash)</h6>
            <hr className="mt-2" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="label label-text" htmlFor="title">
                Sarlavha
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Kurs sarlavhasi"
                className="input"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label label-text" htmlFor="author">
                Ustoz
              </label>
              <input
                id="author"
                name="author"
                type="text"
                placeholder="Ustoz ismi va familiyasi"
                className="input"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="label label-text" htmlFor="price">
                Kurs narxi
              </label>
              <input
                id="price"
                name="price"
                type="number"
                className="input"
                placeholder="500.000 UZS"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label label-text" htmlFor="newPrice">
                Chegirmadan keyingi narx (Majburiy emas)
              </label>
              <div className="input-group">
                <input
                  id="newPrice"
                  type="number"
                  name="newPrice"
                  className="input"
                  value={formData.newPrice}
                  onChange={handleChange}
                  placeholder="300.000 UZS"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              className={`relative w-[348px] h-[216px] border-2 ${
                formData.cover && "fileUploadInput"
              }`}>
              <label
                className="z-10 absolute top-0 left-0 right-0 bottom-0 label flex flex-col items-center justify-center cursor-pointer text-lg border-dashed border-2 border-black/25"
                htmlFor="cover">
                {fileLoading ? (
                  <span className="loading loading-spinner w-15"></span>
                ) : (
                  <>
                    <span className="icon-[tabler--upload] size-6 shrink-0"></span>
                    <span className="text-sm">Kursining muqovasi (16:9)</span>
                  </>
                )}
              </label>
              {formData.cover && (
                <img
                  className="absolute w-full h-full top-0 left-0 object-cover"
                  src={formData.cover}
                  alt="kurs muqovasi"
                />
              )}
              <input
                id="cover"
                type="file"
                name="cover"
                className="input hidden"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label className="label label-text" htmlFor="language">
                Kurs tili:
              </label>
              <select
                className="select mb-4"
                id="language"
                name="language"
                aria-label="Select Country"
                value={formData.language}
                onChange={handleChange}
                required>
                <option value="O'zbek">O'zbek</option>
                <option value="Русский">Русский</option>
                <option value="English">English</option>
              </select>
              <label className="label label-text" htmlFor="duration">
                Kurs davomiyligi(soatda):
              </label>
              <div className="input-group mb-4">
                <input
                  id="duration"
                  type="number"
                  name="duration"
                  className="input "
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="72 soat"
                  required
                />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <label className="label text-base" htmlFor="status">
                    Kurs holati:
                  </label>
                  <input
                    type="checkbox"
                    id="status"
                    name="status"
                    checked={formData.status}
                    onChange={handleChange}
                    className="switch switch-primary"
                  />
                  {formData.status ? (
                    <span className="badge badge-soft badge-success ">
                      Faol
                    </span>
                  ) : (
                    <span className="badge badge-soft badge-error ">
                      Faol emas
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2"></div>
          <div className="w-full h-full flex flex-col overflow-y-auto">
            <label className="label label-text">Kurs haqida</label>
            <div className="flex-grow-[1] border-2 border-slate-300 flex flex-col">
              <MemoEditor
                handleDescChange={handleDescChange}
                description={formData.description}
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              name="submitButton"
              className="btn btn-primary">
              O'zgartirish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
