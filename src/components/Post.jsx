import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import styles from "./Post.module.css";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import { useState } from 'react';

export function Post({ author, publishedAt, content}) {
    const [comments, setComments] = useState([
        'Poste legal'
    ])    

    const [newCommentText, setNewCommentText] = useState('');
    
    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
            locale: ptBR,
        })

const publishedDateFormattedToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })
    
    function handleCreateNewComment() {
        event.preventDefault()

        setComments([...comments, newCommentText]);
        setNewCommentText('');

    }

    function handleNewCommentChange() {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid() {
        event.target.setCustomValidity("Esse campo é obrigatorio!");
    }

    function deleteComment(commentToDelete) {
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })
        setComments(commentsWithoutDeleteOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

        return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder={true} src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted}  dateTime={publishedAt.toISOString()}>
                       {publishedDateFormattedToNow}
                </time>
            </header>

            <div className={styles.content}>
               {content.map(line => {
                if (line.type === 'paragraph') {
                    return <p key={line.content}>{line.content}</p>;
                } else if (line.type === 'link') {
                    return <p key={line.content}><a href='#'>{line.content}</a></p>
                }
               })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixei seu feedback</strong>

                <textarea 
                    value={newCommentText}
                    name="comment"
                    placeholder="Deixe um comentario" 
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                    />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty} >
                        Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                    <Comment 
                        key={comment} 
                        content={comment} 
                        onDeleteComment={deleteComment} 
                    />
                )
                })}
            </div>
        </article>
    )
}