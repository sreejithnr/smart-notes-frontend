import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosClient from "../../api/axiosClient";
import NoteCard from "./NoteCard";
import styles from "../../components/notes/NotesList.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import CircularLoader from "../common/CicularLoader";

/* ---------------- FETCH FUNCTION ---------------- */
const fetchNotes = async ({ pageParam = 1, userId, searchTerm }) => {
  const res = await axiosClient.get("/todo", {
    params: {
      userId,
      page: pageParam,
      limit: 6,
      search: searchTerm || "",
    },
  });
  return res.data; // { notes, nextPage, hasMore }
};

/* ---------------- COMPONENT ---------------- */
const NotesList = ({ searchTerm }) => {
  const { user } = useContext(AuthContext);
  const bottomRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["notes", user?._id, searchTerm],
      queryFn: ({ pageParam }) =>
        fetchNotes({ pageParam, userId: user._id, searchTerm }),
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
      enabled: !!user?._id,
    });

  /* -------- FLATTEN PAGES -------- */
  const notes = data?.pages.flatMap((page) => page.todos) ?? [];

  /* -------- INFINITE SCROLL -------- */
  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  /* -------- UI STATES -------- */
  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <CircularLoader />
      </div>
    );
  }

  /* -------- RENDER -------- */
  return (
    <div>
      {notes?.length === 0 ? (
        <p className={styles.fallbackText}>No Notes Created Yet.</p>
      ) : (
        <div className={styles.grid}>
          {notes?.map((note) => (
            <NoteCard
              key={note._id}
              id={note._id}
              title={note.title}
              date={note.updatedAt}
              note={note.content}
            />
          ))}
        </div>
      )}

      {/* Trigger + Loader */}
      <div ref={bottomRef} />

      {isFetchingNextPage && (
        <div className={styles.bottomLoader}>
          <CircularLoader />
        </div>
      )}
    </div>
  );
};

export default NotesList;
