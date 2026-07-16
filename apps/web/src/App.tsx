import { BrowserRouter, Routes, Route, useParams, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CoursePage } from "./pages/CoursePage";
import { LessonPage } from "./pages/LessonPage";

function LessonRoute() {
  const { courseId, lessonPath } = useParams<{ courseId: string; lessonPath: string }>();
  if (!courseId || !lessonPath) return <Navigate to="/" replace />;
  return <LessonPage lessonId={`${courseId}/${lessonPath}`} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses/:courseId" element={<CoursePage />} />
        <Route path="/courses/:courseId/:lessonPath" element={<LessonRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
