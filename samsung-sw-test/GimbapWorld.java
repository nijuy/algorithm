import java.util.Scanner;

class GimbapWorld
{
	public static void main(String args[]) throws Exception
	{
		Scanner sc = new Scanner(System.in);
        StringBuilder answer = new StringBuilder();
		int T, result, start, end;
        
		T=sc.nextInt();
        sc.nextLine();

		for(int test_case = 1; test_case <= T; test_case++)
		{
            start = sc.nextInt();
            end = sc.nextInt();
            
            if(start == end) result = 0;
            else {
                int[] startPosition = getPosition(start);
                int[] endPosition = getPosition(end);
                
                if(startPosition[0] + startPosition[1] > endPosition[0] + endPosition[1]) {
                    int[] temp = startPosition;
                    startPosition = endPosition;
                    endPosition = temp;
                }
                
                int startCrossLine = startPosition[0] + startPosition[1];
                int endCrossLine = endPosition[0] + endPosition[1];
                int floorDiff = Math.abs(startCrossLine - endCrossLine);
                
                if(startCrossLine == endCrossLine) result = Math.abs(start - end);
                else if(startPosition[0] == endPosition[0]) result = Math.abs(startPosition[1] - endPosition[1]);
                else if(startPosition[1] == endPosition[1]) result = Math.abs(startPosition[0] - endPosition[0]);
          		else if(endPosition[1] < startPosition[1]){ // 도착지가 서브 피라미드 왼쪽 밖
                    result = floorDiff;
                    result += Math.abs(startPosition[1] - endPosition[1]);
                }
                else if(endPosition[0] < startPosition[0]){ // 도착지가 서브 피라미드 오른쪽 밖
                    result = floorDiff;
                    result += Math.abs(startPosition[1] + floorDiff - endPosition[1]);
                }
                else {
                    result = floorDiff;
                }
            }

            answer.append("#" + test_case + " ").append(result).append("\n");
		}
        
        System.out.println(answer);
        sc.close();
        return;
	}
    
    public static int[] getPosition(Integer number)
    {
        int temp = 1;
        int crossLine, line;
        int row, col;
        
        while(true){
            if(number <= temp){
                crossLine = temp;
                line = number;
                break;
            } else {
                number -= temp;
            }
            temp++;
        }
        
        row = crossLine;
        col = -1;
        while(line > 0){
            row -= 1;
            col += 1;
            line--;
        }
        
        int[] position = {row, col};
        return position;
    }
}