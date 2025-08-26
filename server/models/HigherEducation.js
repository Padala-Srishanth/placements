class HigherEducation {
  constructor(data) {
    this.id = data.id || null;
    this.universityName = data.universityName || '';
    this.universityLogo = data.universityLogo || '';
    this.country = data.country || '';
    this.course = data.course || '';
    this.yearOfAdmission = data.yearOfAdmission || new Date().getFullYear();
    this.examScores = data.examScores || {};
    this.applicationProcess = data.applicationProcess || '';
    this.visaProcess = data.visaProcess || '';
    this.tips = data.tips || '';
    this.linkedinProfile = data.linkedinProfile || '';
    this.email = data.email || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Validate higher education data
  validate() {
    const errors = [];

    if (!this.universityName || this.universityName.trim().length === 0) {
      errors.push('University name is required');
    }

    if (!this.country || this.country.trim().length === 0) {
      errors.push('Country is required');
    }

    if (!this.course || this.course.trim().length === 0) {
      errors.push('Course is required');
    }

    if (!this.yearOfAdmission || this.yearOfAdmission < 2000 || this.yearOfAdmission > new Date().getFullYear() + 5) {
      errors.push('Valid year of admission is required');
    }

    if (typeof this.examScores !== 'object' || this.examScores === null) {
      errors.push('Exam scores must be an object');
    }

    return errors;
  }

  // Convert to Firestore document
  toFirestore() {
    return {
      universityName: this.universityName,
      universityLogo: this.universityLogo,
      country: this.country,
      course: this.course,
      yearOfAdmission: this.yearOfAdmission,
      examScores: this.examScores,
      applicationProcess: this.applicationProcess,
      visaProcess: this.visaProcess,
      tips: this.tips,
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

    return new HigherEducation({
      id: doc.id,
      ...data,
      createdAt: safeToDate(data.createdAt),
      updatedAt: safeToDate(data.updatedAt)
    });
  }
}

module.exports = HigherEducation;
