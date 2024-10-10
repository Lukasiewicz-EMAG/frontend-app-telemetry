import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Stat {
  title: string;
  value: string;
  progress?: number;
}

interface GradeDetailsProps {
  stats: Stat[];
}

const GradeDetails = ({ stats }: GradeDetailsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 px-0 mt-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.progress !== undefined && (
              <Progress
                value={stat.progress}
                className="h-2 mt-2"
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default GradeDetails;