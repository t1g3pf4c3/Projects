#lang racket

(require math/number-theory)
(define (integers-starting-from n) ; поток целых чисел, начиная с n

  (stream-cons n (integers-starting-from (+ n 1))) )

(define integers (integers-starting-from 1)) ; поток целых чисел, начиная с 1

(define (printN n seq)

    (if (= n 0) 'done

        (begin 

               (display (stream-first seq))

               ;(newline)

               (display " ")

               (printN (- n 1) (stream-rest seq)))) )

(define nums (integers-starting-from 10)) 

(printN 5 nums)

;; (define (factorial n)
;; 	(if (= n 0) 1
;; 	  (* n (factorial (- n 1)))
;;   )
;; )
;;
;; (define (factorials-starting-from n)
;;   (stream-cons (factorial n) (factorials-starting-from (+ 1 n))))

(define (stream-mul s t)
  (stream-cons (* (stream-first s) (stream-first t)) (stream-mul (stream-rest s) (stream-rest t))))

(define factorials
  (stream-cons 1
	 (stream-mul (integers-starting-from 1) factorials)))
  

(print "factorials: " )
(printN 5 (stream-tail factorials 3))

;; (define nums_ (factorials-starting-from 3))
;; (printN 5 nums_)



(define (stream-add s t)
  (stream-cons (+ (stream-first s) (stream-first t)) (stream-add (stream-rest s) (stream-rest t))))

(define fibs
  (stream-cons 0
               (stream-cons 1
                            (stream-add (stream-rest fibs)
                                         fibs))))
(print "fibonachi")
(printN 5 (stream-tail fibs 7))


(define (filter-1-stream cond stream)
	(stream-cons (cond (stream-first stream)) (filter-1-stream cond (stream-rest stream)))
  )

(define (filter-stream cond stream)
  (if (cond (stream-first stream))
	(stream-cons (stream-first stream) (filter-stream cond (stream-rest stream)))
	(filter-stream cond (stream-rest stream))
	)
)

(printN 5 nums)
(printN 5 (filter-stream even? nums))

(printN 5 (filter-1-stream even? nums))
(define (divides3? a )
  (if (divides? 3 a)
    #t
    #f
   )
)

(define (divides7? a)
    (if (divides? 7 a)
      #t
      #f
     )
 )
(define (divides7and3? a)
    (if (and (divides7? a) (divides3? a))
    #t
    #f
    )
)
(printN 12 nums)
(printN 12 (filter-stream divides7and3? nums))
(printN 12 (filter-1-stream divides7and3? nums))

;; Факториалы
