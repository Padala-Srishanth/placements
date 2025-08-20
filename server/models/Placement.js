class Placement {
  constructor(data) {
    this.id = data.id || null;
    this.companyName = data.companyName || '';
    this.companyLogo = data.companyLogo || '';
    this.role = data.role || '';
    this.location = data.location || '';
    this.batchYear = data.batchYear || new Date().getFullYear();
    this.difficulty = data.difficulty || 'Medium'; // Easy, Medium, Hard
    this.interviewRounds = data.interviewRounds || [];
    this.commonlyAskedQuestions = data.commonlyAskedQuestions || [];
    this.tips = data.tips || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Validate placement data
  validate() {
    const errors = [];

    if (!this.companyName || this.companyName.trim().length === 0) {
      errors.push('Company name is required');
    }

    if (!this.role || this.role.trim().length === 0) {
      errors.push('Role is required');
    }

    if (!this.batchYear || this.batchYear < 2000 || this.batchYear > new Date().getFullYear() + 5) {
      errors.push('Valid batch year is required');
    }

    if (!['Easy', 'Medium', 'Hard'].includes(this.difficulty)) {
      errors.push('Difficulty must be Easy, Medium, or Hard');
    }

    if (!Array.isArray(this.interviewRounds)) {
      errors.push('Interview rounds must be an array');
    }

    if (!Array.isArray(this.commonlyAskedQuestions)) {
      errors.push('Commonly asked questions must be an array');
    }

    return errors;
  }

  // Convert to Firestore document
  toFirestore() {
    return {
      companyName: this.companyName,
      companyLogo: this.companyLogo,
      role: this.role,
      location: this.location,
      batchYear: this.batchYear,
      difficulty: this.difficulty,
      interviewRounds: this.interviewRounds,
      commonlyAskedQuestions: this.commonlyAskedQuestions,
      tips: this.tips,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Create from Firestore document
  static fromFirestore(doc) {
    const data = doc.data();
    return new Placement({
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date()
    });
  }
}

module.exports = Placement;
