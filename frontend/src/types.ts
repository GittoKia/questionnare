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
  questions: Question[];
}

/*Returns*/ 

export type OneTopicProps= {
  topic: Topic;
}

export type AllTopicsProps= {
  topics: Topic[];
}

