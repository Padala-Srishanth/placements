class Placement {
  constructor(data) {
    this.id = data.id || null;
    this.companyName = data.companyName || '';
    this.companyLogo = data.companyLogo || '';
    this.role = data.role || '';
    this.location = data.location || '';
    this.interviewRounds = data.interviewRounds || [];
    this.commonlyAskedQuestions = data.commonlyAskedQuestions || [];
    this.tips = data.tips || '';
    this.linkedinProfile = data.linkedinProfile || '';
    this.email = data.email || '';
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
      interviewRounds: this.interviewRounds,
      commonlyAskedQuestions: this.commonlyAskedQuestions,
      tips: this.tips,
      linkedinProfile: this.linkedinProfile,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Create from Firestore document
  static fromFirestore(doc) {
    const data = doc.data();

    // Helper function to safely convert dates
    const safeToDate = (dateField) => {
      if (!dateField) return new Date();
      if (dateField instanceof Date) return dateField;
      if (typeof dateField === 'string') return new Date(dateField);
      if (dateField.toDate && typeof dateField.toDate === 'function') {
        return dateField.toDate();
      }
      return new Date();
    };

    return new Placement({
      id: doc.id,
      ...data,
      createdAt: safeToDate(data.createdAt),
      updatedAt: safeToDate(data.updatedAt)
    });
  }
}

module.exports = Placement;
