/*Parameters*/

export type Question ={
  id: number;
  prompt: string;
  answer: boolean;
}

export type Topic ={
  id: number;
  title: string;
  description: string;
  content?:string;
  questions?: Question[];
}

/*Returns*/ 

export type OneTopicProps= {
  topic: Topic;
}

export type AllTopicsProps= {
  topics: Topic[];
}

