import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../../style/pages/news.scss";

const NewsDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${slug}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading article details:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Không tìm thấy bài viết.</p>;

  return (
    <section className="news-detail">
      <h1>{post.title}</h1>
      <img
        src={`http://localhost:5000/uploads/images/${post.image}`}
        alt={post.title}
        className="news-detail__image"
      />
      <div className="news-detail__meta">
        <p>
          <strong>Ngày:</strong>{" "}
          {new Date(post.created_at).toLocaleDateString("vi-VN")}
        </p>
        <p>
          <strong>Read time:</strong> {post.read_time} phút
        </p>
      </div>
      <p className="news-detail__content">{post.content}</p>
    </section>
  );
};

export default NewsDetail;
