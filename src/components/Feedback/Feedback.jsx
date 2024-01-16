import {  useState } from 'react';

import Block from './Block/Block';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

import styles from './feedback.module.css';

const Feedback = () => {
    const [state, setState] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
    });

    const feedbackOptions = ['good', 'neutral', 'bad'];

    const calcTotal = () => {
        const { good, neutral, bad } = state;
        return good + neutral + bad;
    };

    const calcPercentage = (keyName) => {
        const total = calcTotal();
        if (!total) {
            return 0;
        }
        const value = state[keyName];
        return Number(((value / total) * 100).toFixed(2));
    };

    const leaveFeedback = (keyName) => {
        setState((prevState) => ({
            ...prevState,
            [keyName]: prevState[keyName] + 1,
        }));
    };

    return (
        <div className={styles.wrapper}>
            <Block title="Please leave feedback">
                <FeedbackOptions options={feedbackOptions} leaveFeedback={leaveFeedback} />
            </Block>
            <Block title="Statistics">
                {calcTotal() ? (
                    <Statistics
                        good={state.good}
                        neutral={state.neutral}
                        bad={state.bad}
                        total={calcTotal()}
                        positivePercentage={calcPercentage('good')}
                    />
                ) : (
                    <Notification title="There is no feedback" />
                )}
            </Block>
        </div>
    );
};

export default Feedback;