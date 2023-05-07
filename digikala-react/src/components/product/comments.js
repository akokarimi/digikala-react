import { useSelector, useDispatch } from "react-redux";

import { Loader } from "../../utils/tools";

const Comments = () => {
  const comments = useSelector((state) => state.products.comments);
  const dispatch = useDispatch();

  const getDate = (creationDate) => {
    return new Intl.DateTimeFormat("fa-IR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(creationDate));
  };

  return (
    <>
      <section className="comments container">
        <p className="comments-title">دیدگاه‌ها</p>
        <div className="comments-container">
          {comments.loading !== "false" ? (
            <Loader />
          ) : (
            <>
              {!comments.data || comments.data.length === 0 ? (
                <p>
                  دیدگاهی برای این محصول وجود ندارد. اولین نفری باشید که به این
                  محصول امتیاز می‌دهید.
                </p>
              ) : (
                <>
                  {comments.data.map((comment) => {
                    return (
                      <>
                        <div className="comment">
                          <div className="comment-title">{comment.title}</div>
                          <div className="comment-suggestion">
                            {comment.recommend === "توصیه می‌کنم" ? (
                              <div className="comment-suggest">
                                <svg className="like-icon">
                                  <use xlinkHref="img/svg-icons.svg#icon-thumb-up"></use>
                                </svg>
                                <p>|</p>
                                <p>{comment.recommend}</p>
                              </div>
                            ) : null}
                            {comment.recommend === "توصیه نمی‌کنم" ? (
                              <div className="comment-suggestnot">
                                <svg className="dislike-icon">
                                  <use xlinkHref="img/svg-icons.svg#icon-thumb-down"></use>
                                </svg>
                                <p>|</p>
                                <p>{comment.recommend}</p>
                              </div>
                            ) : null}
                            {comment.recommend === "نظری ندارم" ? (
                              <div className="comment-suggest">
                                <p>{comment.recommend}</p>
                              </div>
                            ) : null}
                          </div>
                          <div className="comment-text">{comment.review}</div>
                          <div className="comment-rating">
                            <svg className="score-icon">
                              <use xlinkHref="/img/svg-icons.svg#icon-star-full" />
                            </svg>
                            <p>{`${new Intl.NumberFormat("fa-IR").format(
                              comment.rating
                            )}`}</p>
                          </div>
                          <div className="comment-details">
                            <div className="comment-date">
                              {getDate(comment.creationDate)}
                            </div>
                            <div className="comment-owner">{`${comment.user.name} ${comment.user.family}`}</div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Comments;
