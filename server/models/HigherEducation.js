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
    return new HigherEducation({
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date()
    });
  }
}

module.exports = HigherEducation;
