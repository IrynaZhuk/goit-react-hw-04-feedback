import { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const keys = ['good', 'neutral', 'bad'];

  const handleIncrease = option => {
    switch (option) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;

      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;

      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        console.log('Something went wrong!');
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = value => {
    return countTotalFeedback()
      ? Math.floor((value / countTotalFeedback()) * 100)
      : 0;
  };

  return (
    <>
      <Section title="Please, give us your feedback">
        <FeedbackOptions options={keys} onLeaveFeedback={handleIncrease} />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage(good)}
          />
        ) : (
          <Notification message="There is no feedback!" />
        )}
      </Section>
    </>
  );
};
