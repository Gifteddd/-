import React from "react";
import styles from "./ResultArticles.module.scss";
import HTMLReactParser from "html-react-parser";

function ResultArticles({ data }) {
    let markup = data.content.markup;

    markup = markup.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
                   .replace(/<scandoc>/g, "<div>")
                   .replace(/<\/scandoc>/g, "</div>")
                   .replace(/<p>/g, "<span>").replace(/<\/p>/g, "</span>")
                   .replace(/<sentence>/g, "<p>").replace(/<\/sentence>/g, "</p>")
                   .replace(/<entity/g, "<span").replace(/<\/entity>/g, "</span>")
                   .replace(/<speech/g, "<span").replace(/<\/speech>/g, "</span>")
                   .replace(/<vue/g, "<span").replace(/<\/vue>/g, "</span>")
                   .replace(/<br>/g, "");

    markup = markup.replace(/<figure>.*?data-image-src="([^"]+)".*?<\/figure>/g, (_, url) => {
        return url.includes("span") ? "" : `<img src="${url}" alt="Изображение" className={styles.img_data}>`;
    });

    markup = markup.replace(/<span><\/span>/g, "").replace(/<p><\/p>/g, "");

    if (markup.length > 1800) {
        markup = markup.substring(0, markup.lastIndexOf("</p>", 1700) + "</p>".length) + "...";
    }

    markup = HTMLReactParser(markup, "text/xml");

    const titleAttrib = data.attributes.isTechNews ? "Технические новости" :
                       (data.attributes.isAnnouncement ? "Анонсы и события" :
                       (data.attributes.isDigest ? "Дайджест" : "Без категории"));

    const word = data.attributes.wordCount % 10 === 1 ? "слово" :
                 (data.attributes.wordCount % 10 === 2 || data.attributes.wordCount % 10 === 3 || data.attributes.wordCount % 10 === 4 ? "слова" : "слов");

    return (
        <article className={styles.article_container}>
            <div className={styles.article_container__top}>
                <div className={styles.article_container__date_and_author}>
                    <span className={styles.article_container__date}>{new Date(data.issueDate).toLocaleDateString().replace("/", ".")}</span>
                    <a href={data.url} className={styles.article_container__author}>{data.source.name}</a>
                </div>
                <h1 className={styles.article_container__title}>{data.title.text}</h1>
                <span className={styles.article_container__attribut}>{titleAttrib}</span>
            </div>
            <span className={styles.article_container__text}>{markup}</span>
            <div className={styles.article_container__btn_and_wordrs}>
                <button className={styles.article_container__btn}>Читать в источнике</button>
                <span className={styles.article_container__words}>{data.attributes.wordCount} {word}</span>
            </div>
        </article>
    );
}

export default ResultArticles;
