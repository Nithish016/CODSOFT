import React, { createContext, useContext, useState, useEffect } from 'react';

const QuizContext = createContext();

export const useQuizzes = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
    const [quizzes, setQuizzes] = useState(() => {
        const saved = localStorage.getItem('quizzes');
        return saved ? JSON.parse(saved) : [
            {
                id: '1',
                title: 'React Fundamentals',
                description: 'Test your knowledge of React cores like hooks, props, and state.',
                creator: 'Antigravity',
                questions: [
                    {
                        id: 'q1',
                        question: 'What is the purpose of useEffect?',
                        options: ['To manage state', 'To perform side effects', 'To style components', 'To handle routing'],
                        correctAnswer: 1
                    },
                    {
                        id: 'q2',
                        question: 'Which hook is used for complex state logic?',
                        options: ['useState', 'useEffect', 'useReducer', 'useContext'],
                        correctAnswer: 2
                    }
                ]
            }
        ];
    });

    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        localStorage.setItem('quizzes', JSON.stringify(quizzes));
    }, [quizzes]);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    const addQuiz = (quiz) => {
        setQuizzes([...quizzes, { ...quiz, id: Date.now().toString(), creator: currentUser?.username || 'Guest' }]);
    };

    const login = (userData) => setCurrentUser(userData);
    const logout = () => setCurrentUser(null);

    return (
        <QuizContext.Provider value={{ quizzes, addQuiz, currentUser, login, logout }}>
            {children}
        </QuizContext.Provider>
    );
};
