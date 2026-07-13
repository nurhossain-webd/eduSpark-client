import {
  InferSchemaType,
  Model,
  Schema,
  model,
  models,
} from "mongoose";

const instructorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    avatar: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const reviewSchema = new Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    studentImage: {
      type: String,
      default: "",
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: true,
  },
);

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },

    language: {
      type: String,
      required: true,
      trim: true,
      default: "English",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    enrolledStudents: {
      type: Number,
      default: 0,
      min: 0,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    lessons: {
      type: Number,
      required: true,
      min: 1,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    gallery: {
      type: [String],
      default: [],
    },

    instructor: {
      type: instructorSchema,
      required: true,
    },

    curriculum: {
      type: [String],
      default: [],
    },

    reviews: {
      type: [reviewSchema],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

courseSchema.index({
  title: "text",
  shortDescription: "text",
  category: "text",
});

export type CourseDocument = InferSchemaType<typeof courseSchema>;

const Course: Model<CourseDocument> =
  models.Course || model<CourseDocument>("Course", courseSchema);

export default Course;
