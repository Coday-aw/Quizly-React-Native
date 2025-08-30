import Quiz from "../models/quizSchema.js";

const getAllQuizzes = async (req, res) => {
  try {
    const userId = req.query.userId;
    const id = req.query.id;

    if (id) {
      const quiz = await Quiz.findById(id);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      return res.json(quiz);
    } else if (userId) {
      const quizzes = await Quiz.find({ creator: userId });
      return res.json(quizzes);
    }
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};

const createQuiz = async (req, res) => {
  try {
    const { creator, icon, title, questions } = req.body;
    if (!creator || !icon || !title || !questions) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuiz = await Quiz.create({ creator, icon, title, questions });
    if (!newQuiz) {
      return res.status(500).json({ message: "Error creating quiz" });
    }
    res.status(201).json({ message: "Quiz created successfully" });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Error creating quiz" });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = await req.body;

    if (
      !updateData.title ||
      !updateData.icon ||
      !updateData.creator ||
      !updateData.questions
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedQuiz = await Quiz.findOneAndUpdate(id, updatedQuiz, {
      new: true,
      runValidators: true,
    });

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz updated successfully" });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ message: "Error updating quiz" });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Quiz id is required" });
    }

    const deletedQuiz = await Quiz.findOneAndDelete(id);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ message: "Error deleting quiz" });
  }
};

export { getAllQuizzes, createQuiz, deleteQuiz, updateQuiz };
