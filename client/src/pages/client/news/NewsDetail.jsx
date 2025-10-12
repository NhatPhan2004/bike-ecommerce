import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "@style/pages/news.scss";
import HomeNewsSection from "./HomeNewsSection";
import apiRoutes from "@api";

const NewsDetail = ({ title = "RELATED NEWS" }) => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiRoutes.base}${apiRoutes.posts.getById(slug)}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading article details:", err);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Không tìm thấy bài viết.</p>;

  return (
    <section className="news-detail">
      <p className="news-detail__location">
        <span>Trang chủ / Tin tức</span> / {post.title}
      </p>
      <div className="news-detail__container">
        <h1 className="news-detail__title">{post.title}</h1>
        <div className="news-detail__meta">
          <p>
            <strong>Ngày:</strong>{" "}
            {new Date(post.created_at).toLocaleDateString("vi-VN")}
          </p>
          <p>
            <strong>Thời gian đọc:</strong> {post.read_time} phút
          </p>
        </div>
        <img
          src={`${apiRoutes.imageBase}/uploads/images/${post.image}`}
          alt={post.title}
          className="news-detail__image"
        />

        <div
          className="news-detail__content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
      <div className="new-detail__related">
        <HomeNewsSection title="TIN LIÊN QUAN" />
      </div>
    </section>
  );
};

export default NewsDetail;
