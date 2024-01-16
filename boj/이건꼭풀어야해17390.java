import java.io.*;
import java.util.*;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        StringBuilder answer = new StringBuilder();
        
        int n = Integer.parseInt(st.nextToken());
        int q = Integer.parseInt(st.nextToken());
        
        int[] arr = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        Arrays.sort(arr);
        
        int[] prefix = new int[n + 1];
        
        prefix[0] = 0;
        for(int i = 1 ; i <= n ; i++){
            prefix[i] = prefix[i - 1] + arr[i - 1];
        }
        
        for(int i = 0 ; i < q ; i++){
            st = new StringTokenizer(br.readLine());
            int start = Integer.parseInt(st.nextToken());
            int end = Integer.parseInt(st.nextToken());
            answer.append(prefix[end] - prefix[start - 1]).append('\n');
        }
        
        System.out.println(answer.toString().trim());
        return;
    }
}