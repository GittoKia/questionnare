/*Parameters*/

export type Question ={
  prompt: string;
  answer: boolean;
}

export type Topic ={
  _id: string;
  title: string;
  description: string;
  content:string;
  author:string;
  dateCreated:Date;
  questions: Question[];
}

export type User ={
  _id: string;
  name: string;
  password?:string;
  email: string;
  joinDate:string;
  visitedPosts?:[string, number][] 
}

/*Returns*/ 

export type OneTopicProps= {
  topic: Topic;
}

export type AllTopicsProps= {
  topics: Topic[];
}

/*Functions*/

export function convertDate(date:Date):string{
  return date.toString().slice(4,15)
}

export function timeBefore(date:Date):string{
 const now = new Date();

  const today   = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (today.getDay() === date.getDay()) return "today";          // ← added

  let years  = today.getFullYear() - date.getFullYear();
  let months = today.getMonth()    - date.getMonth();
  let days   = today.getDate()     - date.getDate();

  if (days < 0) {
    const daysInPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += daysInPrevMonth;
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years  -= 1;
  }

  let value: number;
  let unit: "year" | "month" | "day";

  if (years > 0) {
    value = years;   unit = "year";
  } else if (months > 0) {
    value = months;  unit = "month";
  } else {
    value = days;    unit = "day";
  }

  const plural = value === 1 ? "" : "s";
  return `${value} ${unit}${plural} ago`;
}

