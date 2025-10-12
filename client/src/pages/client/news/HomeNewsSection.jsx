import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import "@style/pages/news.scss";
import postService from "@services/postService";
import apiRoutes from "@api";

const HomeNewsSection = ({ title = "TIN TỨC MỚI NHẤT" }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService
      .getHomePosts()
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.error("Error fetching article data:", err);
      });
  }, []);

  return (
    <section className="home-news">
      <h2 className="home-news__title">{title}</h2>
      <div className="home-news__list">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div className="home-news__card" key={post.id}>
              <img
                src={`${apiRoutes.imageBase}${post.image}`}
                alt={post.title}
                className="home-news__image"
              />
              <h3 className="home-news__headline">{post.title}</h3>
              <div className="home-news__meta">
                <span>
                  <FaCalendarAlt />{" "}
                  {new Date(post.created_at).toLocaleDateString("vi-VN")}
                </span>
                <span>{post.read_time} phút đọc</span>
              </div>
              <p className="home-news__excerpt">{post.excerpt}</p>
              <Link className="home-news__link" to={`/news/${post.slug}`}>
                Đọc tiếp
              </Link>
            </div>
          ))
        ) : (
          <p>Đang tải tin tức...</p>
        )}
      </div>
    </section>
  );
};

export default HomeNewsSection;
