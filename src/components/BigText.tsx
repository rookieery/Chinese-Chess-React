import { CSSTransition } from 'react-transition-group';
import { BigTextProps } from '../views/Home';

export default function BigText(props: BigTextProps) {
    const { text, isIn } = props;
    return (
        <>
            <CSSTransition classNames="fade" timeout={500} in={isIn} unmountOnExit>
                <div className="big-text">{text}</div>
            </CSSTransition>
        </>
    )
}