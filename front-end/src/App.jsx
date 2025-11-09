import { useEffect, useState } from "react";
import { getCourses } from "./api/couseService";
import CreateForm from "./CreateFrom";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (erorr) {
        console.error(erorr);
        setError(erorr);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Courses</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
        >
          + Create Course
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
            <p className="text-sm text-blue-500 font-medium">{c.category}</p>
            <h2 className="text-lg font-semibold mt-1">{c.name}</h2>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{c.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-700">{c.language}</span>
              <span className="text-yellow-500 font-semibold">{c.rating}★</span>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <span className="font-semibold">${c.price}</span>
              <span className="text-gray-500 text-sm">{c.students_count} students</span>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowForm(false)}></div>
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <CreateForm isForm={setShowForm} onCreate={(newCourse) => {
              setCourses(prev => [...prev, newCourse])
            }} />
          </div>
        </>
      )}
    </div>
  );


}

export default App;