import api from "./axios";

export async function getCourses() {
    const res = await api.get("/courses");
    return res.data
}

export async function getCourse(id) {
    const res = await api.get($`/courses/${id}`);
    return res.data
}

export async function deleteCourse(id) {
    const res = await api.delete($`/courses/${id}`);
    return res.data
}

export async function createCourse(data) {
    await api.post("/courses", data);
}