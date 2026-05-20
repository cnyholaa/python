import sys

def yn_process (yn):
  # confirm yn range [-100, 100]
  if not -100 <= yn <= 100:
    # raise ValueError(f"Out of range: {yn}. Expected Yn value: [-100, 100]")
    return None
  
  # calculate negative value, return yn^4
  if yn <= 0:
    return yn **4
  
  # positive value return 0
  return 0


# case process
def case_process(lines, n, last_row, results):
  if n >= last_row:
    return

  x_value =int(lines[n])

  # confirm X value range 0 < X <= 100
  if not 1 <= x_value <= 100:
    return
    # raise ValueError(f"Out of range: {x_value}. Expected X value: [1, 100]")

  # get yn values
  yn_values=list(map(int, lines[n+1].split()))

  # yn length
  yn_length=len(yn_values)

  # X and the number of integers Yn is not equal,print -1 as the output.
  if yn_length != x_value:
    results.append(-1)
    case_process(lines,n+2,last_row,results)
    return

  
  yn_sum=sum(map(yn_process, yn_values))
  results.append(yn_sum)

  # sys.stdout.write("\n".join(results))
  sys.stdout.write("\n".join(map(str, results)))

  # recursion
  case_process(lines,n+2,last_row,results)
    

def main ():
    # with open("C:/Users/Lenovo/CS/Python/HENNGE.txt","r",encoding="utf-8") as f:
    lines=sys.stdin.read().splitlines()
    
    # lines=f.read().splitlines()
    print(lines)

    # extract N value
    N_value=int(lines[0])
   
    # confirm N value range 1 <= N <= 100
    if not 1 <= N_value <= 100:
      # raise ValueError(f"Out of range: {N_value}. Expected N value:[1, 100]")
      return
    
    # case_process(N_value*2-1)
    case_process(lines,1, N_value*2,[])

   

if __name__ == "__main__":
    main()


  