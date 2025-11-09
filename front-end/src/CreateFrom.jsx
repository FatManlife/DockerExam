import { useState } from "react";
import { createCourse } from "./api/couseService";

const CreateForm = ({ isForm, onCreate }) => {
    const [data, setData] = useState({
        name: "",
        lecturer: "",
        description: "",
        category: "",
        price: "",
        rating: "",
        language: "",
        students_count: ""
    });


    const handleCreate = async () => {
        const required = ["name", "lecturer", "description", "category", "price", "rating", "language", "students_count"];
        const missing = required.some(key => String(data[key]).trim() === "");
        if (missing) return;

        const parsed = {
            ...data,
            id: 0,
            price: parseFloat(data.price),
            rating: parseFloat(data.rating),
            students_count: parseInt(data.students_count)
        };
        try {
            await createCourse(parsed);
            onCreate(parsed);
            isForm(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute inset-0 bg-black/50" onClick={() => isForm(false)}></div>

            <form onSubmit={(e) => e.preventDefault()} className="bg-white p-6 rounded-xl shadow-xl z-10 w-[400px] space-y-4">
                <h2 className="text-xl font-semibold text-center mb-2">Create Course</h2>

                <div className="space-y-1">
                    <label htmlFor="course" className="text-sm font-medium">Course Name</label>
                    <input name="name" id="course" type="text" className="w-full border p-2 rounded-md"
                        value={data.name}
                        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="lecturer" className="text-sm font-medium">Lecturer</label>
                    <input name="lecturer" id="lecturer" type="text" className="w-full border p-2 rounded-md"
                        value={data.lecturer}
                        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <input name="description" id="description" type="text" className="w-full border p-2 rounded-md"
                        value={data.description}
                        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="category" className="text-sm font-medium">Category</label>
                    <input name="category" id="category" type="text" className="w-full border p-2 rounded-md"
                        value={data.category}
                        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="flex gap-2">
                    <div className="space-y-1 w-1/2">
                        <label htmlFor="price" className="text-sm font-medium">Price</label>
                        <input name="price" id="price" type="number" className="w-full border p-2 rounded-md"
                            value={data.price}
                            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1 w-1/2">
                        <label htmlFor="rating" className="text-sm font-medium">Rating</label>
                        <input name="rating" id="rating" type="number" className="w-full border p-2 rounded-md"
                            value={data.rating}
                            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label htmlFor="language" className="text-sm font-medium">Language</label>
                    <input name="language" id="language" type="text" className="w-full border p-2 rounded-md"
                        value={data.language}
                        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="students_count" className="text-sm font-medium">Students Count</label>
                    <input name="students_count" id="students_count" type="number" className="w-full border p-2 rounded-md"
                        value={data.students_count}
                        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
                    />
                </div>

                <button
                    type="button"
                    onClick={handleCreate}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateForm;
